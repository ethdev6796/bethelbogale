-- Add columns for new features
ALTER TABLE public.about ADD COLUMN IF NOT EXISTS resume_url TEXT;
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.education ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image_url TEXT;
