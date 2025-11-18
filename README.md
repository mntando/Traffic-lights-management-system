# Traffic Lights Management System

This repository contains the **Traffic Lights Management System**, a project designed to optimize and manage traffic light operations for efficient traffic flow and improved safety. Developed as part of an electronics engineering final project, this system leverages modern tools and techniques to address real-world traffic challenges.

---

## Features

- **Real-Time Control**: Manage traffic light sequences dynamically based on traffic conditions.
- **Customizable Timings**: Configure light timings for various scenarios (e.g., peak hours, emergencies).
- **Scalable Design**: Easily adaptable to intersections of different sizes.
- **Fault Detection**: Monitor the status of traffic lights to identify and alert for faults.
- **User-Friendly Interface**: Simple interface for operators to adjust settings.

---

## Technologies Used

- **Frontend**: Vue.js for building a responsive and interactive user interface.
- **Backend**: Node.js for managing business logic and real-time updates.
- **Microcontroller**: MicroPython for handling traffic light hardware control.
- **Database**: SQLite for storing configurations and historical data.

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) and npm
- [Vue CLI](https://cli.vuejs.org/)
- Python (for MicroPython integrations)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mntando/Traffic-lights-management-system.git
   cd Traffic-lights-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```

4. **Hardware Setup**:
   - Connect the traffic light system hardware to the microcontroller.
   - Flash the MicroPython script provided in the `hardware/` directory to your microcontroller.

---

## Usage

1. Start the server using the installation steps above.
2. Access the application via `http://localhost:8080` in your web browser.
3. Configure the traffic light timings and monitor live traffic updates.

---

## Project Structure

```
Traffic-lights-management-system/
├── src/
│   ├── components/     # Vue.js components
│   ├── views/          # Application views
│   ├── assets/         # Static assets
│   ├── App.vue         # Main Vue.js file
│   └── main.js         # Application entry point
├── backend/            # Backend logic (Node.js)
├── hardware/           # MicroPython scripts for traffic light control
├── public/             # Static public files
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

---

## Contribution

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any questions or suggestions, please contact:
- **Author**: MV
- **GitHub**: [github.com/mntando](https://github.com/mntando)
