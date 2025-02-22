const API_URL = "/api";

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        document.getElementById("login-form").style.display = "none";
        document.getElementById("workout-section").style.display = "block";
        loadWorkouts();
    } else {
        alert("Login failed: " + data.message);
    }
}

async function loadWorkouts() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/workouts`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const workouts = await res.json();
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";
    workouts.forEach(workout => {
        const li = document.createElement("li");
        li.textContent = `${workout.title} - ${workout.duration} min`;
        workoutList.appendChild(li);
    });
}

async function addWorkout() {
    const token = localStorage.getItem("token");
    const title = document.getElementById("workout-title").value;
    const duration = document.getElementById("workout-duration").value;

    await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title, duration }),
    });

    loadWorkouts();
}
