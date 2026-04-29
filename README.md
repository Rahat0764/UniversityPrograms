<div align="center">

# 🎓 ProgramsTracker

**A Smart & Elegant University Preference Manager**

[![Live Demo](https://img.shields.io/badge/Live_Demo-programs.pro.bd-5b4fff?style=for-the-badge&logo=vercel)](https://programs.pro.bd/)
[![Made with React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![QS Rankings](https://img.shields.io/badge/Data-QS_Rankings_2026-F59E0B?style=for-the-badge&logo=googlesheets&logoColor=white)]()

<p align="center">
  Organize, track, and manage your university applications with ease. Built with modern web technologies, providing seamless offline access, QS ranking automation, and one-click exports.
</p>

</div>

---

## ✨ Features

- **📊 Auto QS Ranking Sync:** Directly integrates with the latest exported QS Ranking database (renamed and formatted for real data accuracy). Automatically fills in Global Ranks, Scores, and City/Country data.
- **📱 Responsive & Beautiful UI:** Fully responsive design that looks stunning on both Mobile and Desktop. Features smooth animations, glassmorphism effects, and distinct degree-based color themes.
- **🗂️ Smart Degree Categorization:** Add programs classified by Bachelor, Master's, or PhD with dynamic default durations and custom options.
- **☁️ Cloud Sync (Short Links):** Generate a tiny URL to instantly sync your preference list across devices without needing an account.
- **📥 Import / 📤 Export Capabilities:**
  - Export your entire list as a neat **CSV file** or a beautifully formatted **PDF**.
  - Direct **Print** option integrated for hard copies.
  - Import existing CSV/XLSX lists effortlessly.
- **🎨 Custom SVG Icons:** Clean, modern, and customized SVG icons used throughout the interface instead of heavy icon libraries.
- **🗑️ Advanced List Management:** Move items Up/Down to prioritize, edit on the go, delete specific programs, or clear the entire list with a confirmation modal.
- **💾 Local Storage:** Works offline! Your data is automatically saved in your browser.

---

## 🛠️ Built With

* **React 18:** For building the interactive user interface. (Used via CDN for a fully client-side single-file approach)
* **Tailwind CSS:** For rapid, responsive, and highly customizable styling.
* **Babel:** In-browser JSX transpilation.
* **SheetJS (xlsx):** For parsing and exporting Excel/CSV files directly in the browser.
* **html2pdf.js:** For generating high-quality PDFs straight from the DOM.
* **lz-string:** For compressing data to generate small cloud sync links.
* **Wikidata SPARQL API:** Used as a fallback to fetch city/state data if not found in the QS database.

---

## 🚀 How to Use

1.  **Visit the Live App:** Go to [programs.pro.bd](https://programs.pro.bd/).
2.  **Add Programs:** Select the Degree type, search for your target university (QS data will auto-populate), enter the program name, and click "Add Program".
3.  **Manage:** Drag items up or down to set your priority list. Edit or remove items as needed.
4.  **Export:** Click on the **Export CSV** to get an excel file, **Export PDF** to download a document, or **Print** to get a hard copy.
5.  **Sync:** Click on "Short Link" at the top right to generate a link. Open this link on another device to restore your data.

---

## 💻 Installation & Setup (Run Locally)

Since this project is built as a single, powerful `index.html` file utilizing CDNs, setting it up is incredibly simple.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Rahat0764/UniversityPrograms.git](https://github.com/Rahat0764/UniversityPrograms.git)
    ```
2.  **Navigate to the directory:**
    ```bash
    cd UniversityPrograms
    ```
3.  **Run the application:**
    * You can simply double-click the `index.html` file to open it in your browser.
    * *Alternative:* Use a local server like VS Code's "Live Server" extension for a better development experience.
4.  **QS Database Setup (Important):**
    * Ensure you have the `qsdata.xlsx` file placed in a folder named `data` at the root directory (i.e., `/data/qsdata.xlsx`), or use the "Import QS XLSX" button in the UI to load it manually.

---

## 👨‍💻 Developer

**Rahat Ahmed**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/RahatAhmedX)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Rahat0764)