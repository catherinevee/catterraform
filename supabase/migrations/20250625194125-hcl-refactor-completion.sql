
-- HCL examples migration refactoring completion notice
-- The large HCL examples migration file has been successfully refactored into smaller, focused files:
--
-- 1. 20250625194122-hcl-examples-iot-keyvault.sql (IoT Hub & Key Vault)
-- 2. 20250625194123-hcl-examples-load-balancer-analytics.sql (Load Balancer, Log Analytics, Logic Apps, Machine Learning)
-- 3. 20250625194124-hcl-examples-management-maps.sql (Management Groups & Maps)
--
-- This approach provides:
-- - Better organization by service categories
-- - Easier maintenance and updates
-- - Smaller, focused migration files
-- - Reduced complexity for debugging
-- - Logical grouping of related examples

SELECT 'HCL examples migration refactoring completed: Large file split into focused, maintainable chunks' as status;
