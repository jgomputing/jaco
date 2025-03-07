-- SQL to clean all custom database objects in Supabase

-- This script will drop all custom functions, tables, types, and other objects in your Supabase database
-- It will NOT drop system functions or extension functions (like pg_trgm functions)
-- Run this in the Supabase SQL Editor to completely clean up your database

-- First, disable triggers to avoid constraint issues during deletion
SET session_replication_role = 'replica';

-- Drop all custom functions
DO $$
DECLARE
    func_record RECORD;
BEGIN
    RAISE NOTICE 'Starting to drop custom functions...';
    
    -- Loop through all functions in the public schema
    FOR func_record IN 
        SELECT 
            n.nspname as schema_name,
            p.proname as function_name,
            pg_get_function_identity_arguments(p.oid) as function_args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        -- Exclude any PostgreSQL internal functions (typically start with pg_)
        AND p.proname NOT LIKE 'pg\_%'
        -- Exclude trigger functions from extensions
        AND p.proname NOT IN (
            'gin_extract_query_trgm',
            'gin_extract_value_trgm',
            'gin_trgm_consistent',
            'gin_trgm_triconsistent',
            'gtrgm_compress',
            'gtrgm_decompress',
            'gtrgm_distance',
            'gtrgm_in',
            'gtrgm_options',
            'gtrgm_out',
            'gtrgm_same',
            'gtrgm_union',
            'set_limit',
            'show_limit',
            'show_trgm',
            'similarity',
            'similarity_dist',
            'similarity_op',
            'strict_word_similarity',
            'strict_word_similarity_commutator_op',
            'strict_word_similarity_dist_commutator_op',
            'strict_word_similarity_dist_op',
            'strict_word_similarity_op',
            'word_similarity',
            'word_similarity_commutator_op',
            'word_similarity_dist_commutator_op',
            'word_similarity_dist_op',
            'word_similarity_op'
        )
    LOOP
        -- Construct and execute DROP FUNCTION statement
        BEGIN
            EXECUTE 'DROP FUNCTION IF EXISTS ' || 
                    func_record.schema_name || '.' || 
                    func_record.function_name || '(' || 
                    func_record.function_args || ') CASCADE;';
                    
            RAISE NOTICE 'Dropped function: %.%(%)', 
                func_record.schema_name, 
                func_record.function_name,
                func_record.function_args;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Failed to drop function %.%(%): %', 
                func_record.schema_name, 
                func_record.function_name,
                func_record.function_args,
                SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Finished dropping custom functions.';
END $$;

-- Drop all custom types
DO $$
DECLARE
    type_record RECORD;
BEGIN
    RAISE NOTICE 'Starting to drop custom types...';
    
    FOR type_record IN 
        SELECT 
            n.nspname as schema_name,
            t.typname as type_name
        FROM pg_type t
        JOIN pg_namespace n ON t.typnamespace = n.oid
        WHERE n.nspname = 'public'
        AND t.typtype = 'c'  -- composite types
        AND t.typname NOT LIKE 'pg\_%'
    LOOP
        BEGIN
            EXECUTE 'DROP TYPE IF EXISTS ' || 
                    type_record.schema_name || '.' || 
                    type_record.type_name || ' CASCADE;';
                    
            RAISE NOTICE 'Dropped type: %.%', 
                type_record.schema_name, 
                type_record.type_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Failed to drop type %.%: %', 
                type_record.schema_name, 
                type_record.type_name,
                SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Finished dropping custom types.';
END $$;

-- Drop all tables in the public schema
DO $$
DECLARE
    table_record RECORD;
BEGIN
    RAISE NOTICE 'Starting to drop tables...';
    
    FOR table_record IN 
        SELECT 
            table_schema,
            table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        -- Exclude Supabase system tables
        AND table_name NOT LIKE 'pg\_%'
        AND table_name NOT IN ('schema_migrations', 'spatial_ref_sys')
    LOOP
        BEGIN
            EXECUTE 'DROP TABLE IF EXISTS ' || 
                    quote_ident(table_record.table_schema) || '.' || 
                    quote_ident(table_record.table_name) || ' CASCADE;';
                    
            RAISE NOTICE 'Dropped table: %.%', 
                table_record.table_schema, 
                table_record.table_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Failed to drop table %.%: %', 
                table_record.table_schema, 
                table_record.table_name,
                SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Finished dropping tables.';
END $$;

-- Drop all views in the public schema
DO $$
DECLARE
    view_record RECORD;
BEGIN
    RAISE NOTICE 'Starting to drop views...';
    
    FOR view_record IN 
        SELECT 
            table_schema,
            table_name
        FROM information_schema.views
        WHERE table_schema = 'public'
        -- Exclude Supabase system views
        AND table_name NOT LIKE 'pg\_%'
    LOOP
        BEGIN
            EXECUTE 'DROP VIEW IF EXISTS ' || 
                    quote_ident(view_record.table_schema) || '.' || 
                    quote_ident(view_record.table_name) || ' CASCADE;';
                    
            RAISE NOTICE 'Dropped view: %.%', 
                view_record.table_schema, 
                view_record.table_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Failed to drop view %.%: %', 
                view_record.table_schema, 
                view_record.table_name,
                SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Finished dropping views.';
END $$;

-- Drop all sequences in the public schema
DO $$
DECLARE
    seq_record RECORD;
BEGIN
    RAISE NOTICE 'Starting to drop sequences...';
    
    FOR seq_record IN 
        SELECT 
            sequence_schema,
            sequence_name
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
    LOOP
        BEGIN
            EXECUTE 'DROP SEQUENCE IF EXISTS ' || 
                    quote_ident(seq_record.sequence_schema) || '.' || 
                    quote_ident(seq_record.sequence_name) || ' CASCADE;';
                    
            RAISE NOTICE 'Dropped sequence: %.%', 
                seq_record.sequence_schema, 
                seq_record.sequence_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Failed to drop sequence %.%: %', 
                seq_record.sequence_schema, 
                seq_record.sequence_name,
                SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Finished dropping sequences.';
END $$;

-- Specifically drop our application functions if they exist (in case they weren't caught above)
DROP FUNCTION IF EXISTS increment_blog_views(UUID);
DROP FUNCTION IF EXISTS increment_music_album_views(UUID);
DROP FUNCTION IF EXISTS increment_music_track_plays(UUID);
DROP FUNCTION IF EXISTS increment_video_views(UUID);
DROP FUNCTION IF EXISTS create_blog_post_with_tags(JSONB, TEXT[]);
DROP FUNCTION IF EXISTS add_tags_to_blog_post(UUID, TEXT[]);
DROP FUNCTION IF EXISTS create_video_with_tags(JSONB, TEXT[]);
DROP FUNCTION IF EXISTS add_tags_to_video(UUID, TEXT[]);

-- Reset triggers to normal operation
SET session_replication_role = 'origin';

-- Verify that custom objects are gone
RAISE NOTICE 'Remaining custom functions:';
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_function_identity_arguments(p.oid) as function_args
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname NOT LIKE 'pg\_%'
AND p.proname NOT IN (
    'gin_extract_query_trgm',
    'gin_extract_value_trgm',
    'gin_trgm_consistent',
    'gin_trgm_triconsistent',
    'gtrgm_compress',
    'gtrgm_decompress',
    'gtrgm_distance',
    'gtrgm_in',
    'gtrgm_options',
    'gtrgm_out',
    'gtrgm_same',
    'gtrgm_union',
    'set_limit',
    'show_limit',
    'show_trgm',
    'similarity',
    'similarity_dist',
    'similarity_op',
    'strict_word_similarity',
    'strict_word_similarity_commutator_op',
    'strict_word_similarity_dist_commutator_op',
    'strict_word_similarity_dist_op',
    'strict_word_similarity_op',
    'word_similarity',
    'word_similarity_commutator_op',
    'word_similarity_dist_commutator_op',
    'word_similarity_dist_op',
    'word_similarity_op'
);

RAISE NOTICE 'Remaining tables:';
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
AND table_name NOT LIKE 'pg\_%'
AND table_name NOT IN ('schema_migrations', 'spatial_ref_sys');

RAISE NOTICE 'Remaining types:';
SELECT 
    n.nspname as schema_name,
    t.typname as type_name
FROM pg_type t
JOIN pg_namespace n ON t.typnamespace = n.oid
WHERE n.nspname = 'public'
AND t.typtype = 'c'  -- composite types
AND t.typname NOT LIKE 'pg\_%';
