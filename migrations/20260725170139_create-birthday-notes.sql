-- Private birthday notes for Samuel.
-- Server uses InsForge API key (project_admin). No anon/authenticated policies.

CREATE TABLE public.birthday_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text,
  category text NOT NULL DEFAULT 'note',
  know_me text,
  message text NOT NULL CHECK (char_length(message) >= 2 AND char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX birthday_notes_created_at_idx ON public.birthday_notes (created_at DESC);

ALTER TABLE public.birthday_notes ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.birthday_notes FROM anon, authenticated;
