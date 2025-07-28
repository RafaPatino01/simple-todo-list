# Task Manager Pro 📋✨

A modern, professional task management application built with React, TypeScript, and Bootstrap. Stay organized and get things done efficiently with a beautiful, Apple-inspired interface.

## 🎯 Features

### ✅ Core Functionality
- **Create Tasks** - Comprehensive task creation with title, description, priority, category, and due dates
- **Edit Tasks** - Full editing capabilities for all task properties
- **Complete Tasks** - Mark tasks as done with satisfying animations
- **Delete Tasks** - Remove tasks with confirmation dialogs
- **Local Storage** - Your tasks persist between browser sessions

### 🎨 Professional Design
- **Apple-inspired UI** - Clean, modern interface with glassmorphism effects
- **Priority System** - High, Medium, Low priorities with color-coded indicators
- **Category Organization** - Work, Personal, Shopping, Health, Finance, Learning, Other
- **Due Date Warnings** - Visual indicators for overdue and upcoming tasks
- **Responsive Design** - Optimized for desktop with mobile support

### 🔍 Smart Filtering
- **Filter by Status** - All Tasks, Active, Completed
- **Task Counters** - Real-time count of active and completed tasks
- **Visual Feedback** - Clear indication of current filter state

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager-pro.git
   cd task-manager-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Bootstrap** - UI components and styling
- **Bootstrap Icons** - Professional icon set
- **CSS3** - Custom styling with gradients and animations

## 📱 Usage

### Adding Tasks
1. Click the **"Add New Task"** button
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Priority** (High/Medium/Low)
   - **Category** (Work/Personal/etc.)
   - **Due Date** (optional)
3. Click **"Add Task"** to save

### Editing Tasks
1. Click the **pencil icon** on any task
2. Modify the task details in the modal
3. Click **"Update Task"** to save changes

### Managing Tasks
- **Complete**: Check the checkbox to mark as done
- **Filter**: Use the filter buttons to view specific task sets
- **Delete**: Click the trash icon (with confirmation)

## 🎨 Design Philosophy

Task Manager Pro follows Apple's design principles:
- **Clarity** - Clean, uncluttered interface
- **Depth** - Layered UI with shadows and transparency
- **Simplicity** - Intuitive interactions and workflows

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── AddTaskModal.tsx # Task creation/editing modal
│   ├── TodoList.tsx     # Main task list
│   ├── TodoItem.tsx     # Individual task cards
│   ├── FilterBar.tsx    # Task filtering controls
│   └── ConfirmDialog.tsx # Delete confirmation
├── types/               # TypeScript definitions
│   └── Todo.ts         # Task and enum types
├── utils/              # Utility functions
│   └── localStorage.ts # Data persistence
└── App.tsx             # Main application
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Known Issues
- Form validation occasionally shows false "Title is required" errors during editing
- Modal state may persist between different task operations (working on fixes)

### Development Guidelines
1. Use TypeScript for all new code
2. Follow existing component patterns
3. Maintain consistent styling with the design system
4. Add proper error handling

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Apple's iOS and macOS interfaces
- Icons provided by React Bootstrap Icons
- Built with the amazing React and TypeScript ecosystems

---

**Start organizing your tasks today!** 🎯
```
