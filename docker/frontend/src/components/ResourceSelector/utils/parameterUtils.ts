// Utility functions for handling resource parameters

// Define required parameters for each resource type
const REQUIRED_PARAMETERS = {
  // Azure Resources
  'azurerm_virtual_machine': ['size', 'admin_username', 'network_interface_ids', 'os_disk', 'source_image_reference'],
  'azurerm_storage_account': ['account_tier', 'account_replication_type'],
  'azurerm_network_interface': ['ip_configuration'],
  'azurerm_virtual_network': ['address_space'],
  'azurerm_subnet': ['virtual_network_name', 'address_prefixes'],
  'azurerm_network_security_group': [],
  'azurerm_key_vault': ['tenant_id', 'sku_name'],
  'azurerm_mssql_database': ['server_id'],
  'azurerm_mssql_server': ['version', 'administrator_login', 'administrator_login_password'],
  'azurerm_application_gateway': ['sku', 'gateway_ip_configuration', 'frontend_port', 'frontend_ip_configuration', 'backend_address_pool', 'backend_http_settings', 'http_listener', 'request_routing_rule'],

  // AWS Resources
  'aws_instance': ['ami', 'instance_type'],
  'aws_vpc': ['cidr_block'],
  'aws_subnet': ['vpc_id', 'cidr_block'],
  'aws_security_group': ['vpc_id'],
  'aws_s3_bucket': [],
  'aws_db_instance': ['allocated_storage', 'engine', 'instance_class', 'username', 'password'],
  'aws_lambda_function': ['filename', 'function_name', 'role', 'handler', 'runtime'],
  'aws_lb': ['load_balancer_type', 'subnets']
};

export const removeOptionalParameters = (resourcesCode: string): string => {
  const lines = resourcesCode.split('\n');
  const result: string[] = [];
  let currentResourceType = '';
  let inResourceBlock = false;
  let braceCount = 0;
  let resourceBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we're starting a resource block
    const resourceMatch = line.match(/^resource\s+"([^"]+)"\s+"[^"]+"\s*\{/);
    if (resourceMatch) {
      currentResourceType = resourceMatch[1];
      inResourceBlock = true;
      braceCount = 1;
      resourceBuffer = [line];
      continue;
    }

    if (inResourceBlock) {
      resourceBuffer.push(line);
      
      // Count braces to track block depth
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;

      // If we've closed the resource block
      if (braceCount === 0) {
        inResourceBlock = false;
        
        // Process the resource block to remove optional parameters
        const processedResource = processResourceBlock(resourceBuffer, currentResourceType);
        result.push(...processedResource);
        
        resourceBuffer = [];
        currentResourceType = '';
      }
    } else {
      // Add non-resource lines directly
      result.push(line);
    }
  }

  return result.join('\n');
};

const processResourceBlock = (resourceLines: string[], resourceType: string): string[] => {
  const requiredParams = REQUIRED_PARAMETERS[resourceType as keyof typeof REQUIRED_PARAMETERS] || [];
  const result: string[] = [];
  
  // Always keep the resource declaration line
  result.push(resourceLines[0]);
  
  // Always keep name and basic identification
  result.push('  name = ' + resourceLines.find(line => line.trim().startsWith('name ='))?.trim().split('=')[1] || '"example"');
  
  // Keep resource group and location for Azure resources
  if (resourceType.startsWith('azurerm_')) {
    const rgLine = resourceLines.find(line => line.trim().startsWith('resource_group_name ='));
    const locationLine = resourceLines.find(line => line.trim().startsWith('location ='));
    if (rgLine) result.push('  ' + rgLine.trim());
    if (locationLine) result.push('  ' + locationLine.trim());
  }

  // Keep VPC and subnet references for AWS resources
  if (resourceType.startsWith('aws_')) {
    const vpcLine = resourceLines.find(line => line.trim().startsWith('vpc_id ='));
    const subnetLine = resourceLines.find(line => line.trim().startsWith('subnet_id ='));
    const securityGroupsLine = resourceLines.find(line => line.trim().startsWith('vpc_security_group_ids ='));
    if (vpcLine) result.push('  ' + vpcLine.trim());
    if (subnetLine) result.push('  ' + subnetLine.trim());
    if (securityGroupsLine) result.push('  ' + securityGroupsLine.trim());
  }

  // Process required parameters based on resource type
  for (const param of requiredParams) {
    const paramLines = extractParameterBlock(resourceLines, param);
    if (paramLines.length > 0) {
      result.push(...paramLines);
    }
  }

  // Always keep comments and documentation references
  const commentLines = resourceLines.filter(line => line.trim().startsWith('#') || line.trim().startsWith('//'));
  result.push(...commentLines);

  // Keep basic tags
  result.push('');
  result.push('  tags = {');
  result.push('    created_with_terraform = "true"');
  result.push('    env = "testing"');
  result.push('  }');
  
  // Always keep the closing brace
  result.push('}');
  result.push('');

  return result;
};

const extractParameterBlock = (lines: string[], paramName: string): string[] => {
  const result: string[] = [];
  let inBlock = false;
  let braceCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith(`${paramName} =`) || line.trim().startsWith(`${paramName} {`)) {
      inBlock = true;
      result.push('  ' + line.trim());
      
      if (line.includes('{')) {
        braceCount = 1;
      } else if (line.includes('=') && !line.includes('{')) {
        // Single line parameter
        return result;
      }
    } else if (inBlock) {
      result.push('  ' + line.trim());
      
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;
      
      if (braceCount === 0) {
        break;
      }
    }
  }
  
  return result;
};
