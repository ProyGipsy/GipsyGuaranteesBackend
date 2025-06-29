# Backend Project

This is the backend of the project built using Django. The backend is responsible for handling business logic, database interactions, and serving API endpoints for the frontend application.

## Project Structure

- **manage.py**: Command-line utility for interacting with the Django project.
- **backend/**: Contains the main Django project files.
  - **__init__.py**: Indicates that this directory is a Python package.
  - **settings.py**: Configuration settings for the Django project, including database settings.
  - **urls.py**: URL routing for the application.
  - **wsgi.py**: Entry point for WSGI-compatible web servers.
- **app/**: Contains the Django application files.
  - **__init__.py**: Indicates that this directory is a Python package.
  - **admin.py**: Configuration for the Django admin interface.
  - **apps.py**: Application configuration.
  - **models.py**: Database models for the application.
  - **tests.py**: Test cases for the application.
  - **views.py**: Logic for handling requests and returning responses.
- **requirements.txt**: Lists the required Python packages for the project.
- **README.md**: Documentation for the project.

## Getting Started

1. **Clone the repository**: 
   ```
   git clone <repository-url>
   cd backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

4. **Configure the database**: Update `settings.py` with your SQL Server database configuration.

5. **Run migrations**:
   ```
   python manage.py migrate
   ```

6. **Start the development server**:
   ```
   python manage.py runserver
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.