export default function Component() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-serif">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider mb-2">SRAJAL TIWARI</h1>
        <p className="text-sm">srajaltiwari902@gmail.com | +91 9919084211 | Lucknow, India</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-8 mb-8 text-sm">
        <a href="#" className="underline">
          LinkedIn
        </a>
        <a href="#" className="underline">
          Github
        </a>
        <a href="#" className="underline">
          CodingNinjas
        </a>
        <a href="#" className="underline">
          Leetcode
        </a>
      </div>

      <hr className="border-black mb-6" />

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">SKILLS</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>Programming skills :</strong> C/C++, Python, SQL
          </li>
          <li>
            <strong>Frameworks :</strong> Pandas , Numpy , Matplotlib, Scikit-learn, Seaborn.
          </li>
          <li>
            <strong>Core Competencies:</strong> Basics of DSA, Machine learning, Operating System, DBMS.
          </li>
          <li>
            <strong>Tools & Platforms:</strong> Google Colaboratory, Kaggle, Cursor IDE, MySQL Workbench, VS Code,
            Docker.
          </li>
        </ul>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">EDUCATION</h2>
        <div className="text-sm">
          <h3 className="font-bold">• Babu Banarasi Das University, Lucknow</h3>
          <p className="ml-4">B.Tech in Computer Science and Engineering (Artificial Intelligence)</p>
          <p className="ml-4">Expected Graduation: 2027 | CGPA: 8.3/10 (First Year)</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">PROJECTS</h2>

        <div className="mb-4 text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">
              Spam Email Detection Model –{" "}
              <a href="#" className="underline">
                GitHub
              </a>
            </h3>
            <span>April 2025</span>
          </div>
          <ul className="ml-4 space-y-1">
            <li>
              • Developed a logistic regression model to classify emails as spam or ham, achieving 96.77% training
              accuracy and 96.68% test accuracy and 100% recall and F1-score.
            </li>
            <li>
              • Applied TF-IDF vectorization to transform email text into numerical features, optimizing for accurate
              spam detection.
            </li>
            <li>• Enhanced model performance through hyperparameter tuning and robust text preprocessing.</li>
          </ul>
        </div>

        <div className="mb-4 text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">
              Rock vs. Mine Prediction Model –{" "}
              <a href="#" className="underline">
                GitHub
              </a>
            </h3>
            <span>May 2025</span>
          </div>
          <ul className="ml-4 space-y-1">
            <li>
              • Developed a logistic regression model to classify sonar signals as rock or mine, achieving 83.42%
              training accuracy and 76.19% test accuracy.
            </li>
            <li>
              • Processed 208 sonar data samples with 60 features, splitting into 80-10 train-test sets using stratified
              sampling for balanced class distribution.
            </li>
            <li>
              • Implemented feature scaling to standardize and binary classification techniques on real-world sonar
              data.
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">
              Diabetes Prediction Model –{" "}
              <a href="#" className="underline">
                GitHub
              </a>
            </h3>
            <span>May 2025</span>
          </div>
          <ul className="ml-4 space-y-1">
            <li>
              • Built a machine learning model using the PIMA Indian Diabetes dataset to predict diabetes, achieving
              training accuracy: 78.33%, Test Accuracy: 77.27%.
            </li>
            <li>
              • Compared models (Logistic Regression) and evaluated performance using confusion matrix and
              classification report.
            </li>
            <li>• Integrated data visualization and EDA to uncover key trends influencing diabetes prediction.</li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">EXPERIENCE</h2>
        <div className="text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">Artificial Intelligence Intern – Codex Technologies (Remote)</h3>
          </div>
          <div className="flex justify-between items-start mb-2">
            <span>
              March 2025 – May 2025 –{" "}
              <a href="#" className="underline">
                Certificate
              </a>
            </span>
          </div>
          <ul className="ml-4 space-y-1">
            <li>• Applied AI concepts including supervised/unsupervised learning and reinforcement learning.</li>
            <li>• Built and evaluated machine learning models using Python and key ML frameworks.</li>
            <li>
              • Participated in real-world AI projects involving data cleaning, preprocessing, and model optimization.
            </li>
          </ul>
        </div>
      </section>

      {/* Certification */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">CERTIFICATION</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>
              • <strong>AI Engineer Certification, One Roadmap</strong> (
              <a href="#" className="underline">
                View
              </a>
              )
            </span>
            <span>May 28, 2025</span>
          </li>
          <li className="ml-4">Completed projects on supervised and unsupervised learning algorithms.</li>

          <li className="flex justify-between">
            <span>
              • <strong>Python Certification, One Roadmap</strong> (
              <a href="#" className="underline">
                View
              </a>
              )
            </span>
            <span>May 21, 2025</span>
          </li>
          <li className="ml-4">Mastered Python programming, data structures, and functional logic.</li>

          <li className="flex justify-between">
            <span>
              • <strong>SQL Certification, One Roadmap</strong> (
              <a href="#" className="underline">
                View
              </a>
              )
            </span>
            <span>May 21, 2025</span>
          </li>
          <li className="ml-4">Worked on SQL queries, joins, and real-time database management.</li>

          <li className="flex justify-between">
            <span>
              • <strong>Cyber Security Virtual Experience, Deloitte (Forage)</strong> (
              <a href="#" className="underline">
                View
              </a>
              )
            </span>
            <span>July 7, 2025</span>
          </li>
          <li className="ml-4">Simulated threat analysis and cyber-security risk mitigation tasks.</li>

          <li className="flex justify-between">
            <span>
              • <strong>Data Analytics Virtual Experience, Deloitte (Forage)</strong> (
              <a href="#" className="underline">
                View
              </a>
              )
            </span>
            <span>July 7, 2025</span>
          </li>
          <li className="ml-4">Performed data analysis and forensic technology simulations.</li>
        </ul>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-xl font-bold mb-3">ACHIEVEMENTS</h2>
        <ul className="space-y-1 text-sm">
          <li>• Participated in Hack-a-thon 2.0, a competitive coding event by Coding Ninjas.</li>
          <li>• Attended the Google GDG Program in Lucknow and earned verified participation badges.</li>
        </ul>
      </section>
    </div>
  )
}
