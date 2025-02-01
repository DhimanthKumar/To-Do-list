

---

# To-Do List

A full-stack To-Do list application built using **Django** (backend) and **React** (frontend). Users can create, view, edit, and delete tasks. The app also allows users to mark tasks as completed.

---

## Features

- **Create a task**: Users can add new tasks with a title and description.
- **View tasks**: Users can view a list of all tasks in the to-do list.
- **Edit tasks**: Users can update the title or description of an existing task.
- **Delete tasks**: Users can delete tasks from the list.
- **Mark tasks as completed**: Users can mark tasks as completed, which updates the status of the task.

---

## Technologies Used

- **Backend**: Django, Django Rest Framework (DRF)
- **Frontend**: React, Axios
- **Database**: SQLite (default database for Django)

---

## Installation

### Backend Setup (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/DhimanthKumar/To-Do-list.git
   cd To-Do-list
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

   The backend API should now be running on `http://127.0.0.1:8000/`.

---

### Frontend Setup (React)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173/`.

---

## API Endpoints

- **GET** `/api/get`: Fetch all tasks.
- **POST** `/api/post`: Create a new task.
- **PATCH** `/api/patch/<int:id>`: Update a specific task (title, description, or completed status).
- **DELETE** `/api/delete/<int:id>`: Delete a specific task.

---

## Usage

1. Open the app in your browser at `http://localhost:3000/`.
2. **Add a new task** by entering the title and description, then clicking "Add Task."
3. **Edit a task** by clicking the edit icon on the task and modifying the title or description.
4. **Mark a task as completed** by clicking the checkmark next to the task.
5. **Delete a task** by clicking the trash can icon.

---

## Folder Structure

### Backend (Django)

```
backend/
├── myapp/                # API app containing models and views
├── manage.py           # Django manage file
└── requirements.txt    # Python dependencies
```

### Frontend (React)

```
frontend/
├── public/             # Public assets (index.html)
├── src/                # React source files
|   ├── assets/           #images
│   ├── components/     # React components (e.g., Task list, task form)
│   ├── App.jsx          # Main React component
│   └── main.jsc        # React entry point
└── package.json        # Node.js dependencies
```

---

## Future Improvements

- User authentication (login/signup)
- Task due dates and prioritization
- Sorting and filtering tasks by completion status or due date

---

