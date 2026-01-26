# tsak-web
Thai Students Association in Republic of Korea Official Website

## To run this project
### Activate Project Manager (Install uv first)
```
uv sync
```

### Make First Migrations
```
cd backend
python manage.py makemigrations sponsors
python manage.py makemigrations members
python manage.py makemigrations events
python manage.py makemigrations announcements
python manage.py makemigrations scholarships
python manage.py makemigrations experiences
python manage.py migrate
```
This is only for first time running. For later migration after changing model schema in backend, only run
```
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Run Backend Server
```
cd backend
python manage.py runserver
```
The backend API should now be available at `http://localhost:8000/api/`

### Run Frontend
```
npm install
npm run dev
```
The frontend host should now be available at `http://localhost:3000`

### Access Admin page
```
cd backend
python manage.py createsuperuser
python manage.py runserver
```

The admin page should now be available at `http://localhost:8000/admin/`