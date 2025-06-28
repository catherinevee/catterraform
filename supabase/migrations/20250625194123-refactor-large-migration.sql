
-- Split large migration into focused chunks for better maintainability
-- 
-- The original migration file `20250625194120-83ef8397-443c-471d-bca9-d47b28bc33a8.sql` 
-- has been refactored into smaller, focused migration files:
--
-- 1. 20250625194120-83ef8397-443c-471d-bca9-d47b28bc33a8.sql (D-G services)
-- 2. 20250625194121-additional-azure-services-h-m.sql (H-M services)  
-- 3. 20250625194122-hcl-examples-h-m-services.sql (H-M examples)
--
-- This approach provides:
-- - Better readability and maintainability
-- - Easier debugging and rollback capabilities
-- - Logical grouping by service categories
-- - Smaller, focused migration files

-- This migration serves as a documentation record of the refactoring
SELECT 'Migration refactoring completed: Large migration split into focused files' as status;
