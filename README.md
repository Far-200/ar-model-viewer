# ✈️ AR Airplane Viewer

An interactive **Web-based Augmented Reality (AR) airplane viewer** built using the `<model-viewer>` web component.

Users can explore a 3D airplane model, interact with it using touch controls, enable gyroscope-based camera movement, and place the airplane in their real environment using AR.

🌐 **Live Demo:**  
https://far-200.github.io/ar-model-viewer/

---

# 🚀 Features

- Interactive **3D airplane model viewer**
- Drag to rotate the airplane
- Scroll / pinch to zoom
- **Auto-rotation toggle**
- **Gyroscope-based interaction** on mobile
- **Flight mode animation**
- **WebXR-based AR placement**
- Mobile-friendly responsive UI

---

# 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript
- `<model-viewer>` Web Component
- WebXR API
- Device Orientation API

---

# 📂 Project Structure

ar-model-viewer
│
├── index.html
├── css
│ └── style.css
├── js
│ └── app.js
├── models
│ └── airplane.glb
└── README.md

---

# 📱 How AR Works

The project uses the `<model-viewer>` component to enable Augmented Reality.

Supported AR modes:

- **WebXR** (Android Chrome)
- **Scene Viewer**
- **Quick Look (iOS)**

When the user taps **View in AR**:

1. The device camera opens.
2. The environment is scanned for a surface.
3. The airplane model is placed in the real world.

---

# 🎮 Controls

| Control           | Function                           |
| ----------------- | ---------------------------------- |
| Drag              | Rotate airplane                    |
| Scroll / Pinch    | Zoom                               |
| Pause Auto-Rotate | Toggle model rotation              |
| Enable Gyro       | Use device motion to inspect model |
| Start Flight Mode | Simulate airplane movement         |

---

# ⚙️ Setup & Run Locally

Clone the repository:

```bash
git clone https://github.com/Far-200/ar-model-viewer.git
```

Open the project folder and run a local server (for example using VS Code Live Server).
Right Click → Open with Live Server

🌍 Deployment

The project is deployed using GitHub Pages.
The site will be available at:
https://far-200.github.io/ar-model-viewer/
