-- Add is_public column to projects table for project sharing
-- Run this in Supabase SQL Editor
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Create index for public project lookups
CREATE INDEX IF NOT EXISTS idx_projects_public ON projects(id) WHERE is_public = true;
