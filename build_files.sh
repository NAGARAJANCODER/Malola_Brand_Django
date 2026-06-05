#!/bin/bash
# Vercel build script — runs before Lambda is packaged
echo "Running Django migrations..."
python manage.py migrate --run-syncdb
echo "Done."
