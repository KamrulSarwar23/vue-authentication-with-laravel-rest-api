<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useApi } from "../../composables/useApi";

const { api } = useApi();

const authStore = useAuthStore();
const tasks = ref([]);
const loading = ref(false);
const error = ref(null);

// Form data for new/edit task
const taskForm = ref({
  id: null,
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
});

// Dialog controls
const showDialog = ref(false);
const isEditing = ref(false);
const formLoading = ref(false);

// Status and priority options
const statusOptions = ["Pending", "In Progress", "Completed", "On Hold"];
const priorityOptions = ["Low", "Medium", "High", "Critical"];

// Fetch tasks from API
const fetchTasks = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.get("/tasks");
    tasks.value = response.data.tasks;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch tasks";
    console.error("Error fetching tasks:", err);
  } finally {
    loading.value = false;
  }
};

// Open dialog for new task
const openNewTaskDialog = () => {
  taskForm.value = {
    id: null,
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  };
  isEditing.value = false;
  showDialog.value = true;
};

// Open dialog to edit task
const openEditTaskDialog = (task) => {
  taskForm.value = { ...task };
  isEditing.value = true;
  showDialog.value = true;
};

// Save task (create or update)
const saveTask = async () => {
  try {
    formLoading.value = true;

    const data = {
      title: taskForm.value.title,
      description: taskForm.value.description,
      status: taskForm.value.status,
      priority: taskForm.value.priority,
      due_date: taskForm.value.dueDate,
    };

    if (isEditing.value) {
      await api.put(`/tasks/${taskForm.value.id}`, data);
    } else {
      await api.post("/tasks", data);
    }

    showDialog.value = false;
    await fetchTasks();
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save task";
    console.error("Error saving task:", err);
  } finally {
    formLoading.value = false;
  }
};

// Delete task
const deleteTask = async (id) => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    await api.delete(`/tasks/${id}`);
    await fetchTasks();
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to delete task";
    console.error("Error deleting task:", err);
  }
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fetch tasks on component mount
onMounted(fetchTasks);
</script>

<template>
  <div class="dashboard admin-dashboard">
    <h1>Task Management</h1>
    <p class="user-greeting">Welcome back, {{ authStore.user.name }}</p>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="error = null" class="close-error">×</button>
    </div>

    <div class="task-actions">
      <button class="btn btn-primary" @click="openNewTaskDialog">
        + Add New Task
      </button>
      <button class="btn btn-refresh" @click="fetchTasks" :disabled="loading">
        {{ loading ? "Refreshing..." : "Refresh" }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading tasks...</p>
    </div>

    <!-- Tasks Table -->
    <div v-else class="task-table-container">
      <table class="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td class="description-cell">{{ task.description || "N/A" }}</td>
            <td>
              <span
                class="status-badge"
                :class="'status-' + task.status.toLowerCase().replace(' ', '-')"
              >
                {{ task.status }}
              </span>
            </td>
            <td>
              <span
                class="priority-badge"
                :class="'priority-' + task.priority.toLowerCase()"
              >
                {{ task.priority }}
              </span>
            </td>
            <td>{{ formatDate(task.due_date) }}</td>
            <td class="action-buttons">
              <button class="btn btn-edit" @click="openEditTaskDialog(task)">
                Edit
              </button>
              <button class="btn btn-delete" @click="deleteTask(task.id)">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="tasks.length === 0">
            <td colspan="7" class="no-tasks">
              No tasks found. Create your first task!
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Task Form Dialog -->
    <div
      class="dialog-overlay"
      v-if="showDialog"
      @click.self="showDialog = false"
    >
      <div class="dialog">
        <h2>{{ isEditing ? "Edit Task" : "Add New Task" }}</h2>

        <form @submit.prevent="saveTask">
          <div class="form-group">
            <label for="title">Title <span class="required">*</span></label>
            <input
              type="text"
              id="title"
              v-model="taskForm.title"
              required
              placeholder="Enter task title"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="taskForm.description"
              rows="3"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Status <span class="required">*</span></label>
              <select id="status" v-model="taskForm.status" required>
                <option
                  v-for="option in statusOptions"
                  :value="option"
                  :key="option.id"
                >
                  {{ option }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="priority"
                >Priority <span class="required">*</span></label
              >
              <select id="priority" v-model="taskForm.priority" required>
                <option
                  v-for="option in priorityOptions"
                  :value="option"
                  :key="option.id"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" id="dueDate" v-model="taskForm.dueDate" />
          </div>

          <div class="dialog-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDialog = false"
              :disabled="formLoading"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="formLoading"
            >
              <span v-if="formLoading" class="spinner-small"></span>
              {{ isEditing ? "Update" : "Save" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.user-greeting {
  color: #7f8c8d;
  margin-bottom: 20px;
  font-size: 1rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-error {
  background: none;
  border: none;
  color: #721c24;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0 0 10px;
}

.task-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.spinner-small {
  display: inline-block;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.task-table-container {
  overflow-x: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.task-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  position: sticky;
  top: 0;
}

.task-table tr:hover {
  background-color: #f8f9fa;
}

.description-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-in-progress {
  background-color: #cce5ff;
  color: #004085;
}

.status-completed {
  background-color: #d4edda;
  color: #155724;
}

.status-on-hold {
  background-color: #f8d7da;
  color: #721c24;
}

.priority-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  min-width: 70px;
  text-align: center;
}

.priority-low {
  background-color: #e2e3e5;
  color: #383d41;
}

.priority-medium {
  background-color: #d1ecf1;
  color: #0c5460;
}

.priority-high {
  background-color: #f8d7da;
  color: #721c24;
}

.priority-critical {
  background-color: #721c24;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.no-tasks {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.btn {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-refresh {
  background-color: #6c757d;
  color: white;
}

.btn-refresh:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-edit {
  background-color: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

/* Dialog Styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  padding: 25px;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog h2 {
  margin-top: 0;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #495057;
}

.required {
  color: #dc3545;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

@media (max-width: 768px) {
  .task-table th,
  .task-table td {
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 5px;
  }

  .btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

  .dialog {
    margin: 0 15px;
    padding: 15px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>