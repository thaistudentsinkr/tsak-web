# tsak-web
Thai Students Association in Republic of Korea Official Website

## To run this project
### Make migrations
```
python ./manage.py makemigrations
python ./manage.py migrate
```
We need to make migrations every time we updated database schema or fleshly clone

### Run Backend Server
```
cd backend
uv sync (you got to have uv)
python ./manage.py runserver
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
python ./manage.py createsuperuser
python ./manage.py runserver
```

The admin page should now be available at `http://localhost:8000/admin/`