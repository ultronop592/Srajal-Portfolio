"use client"

export default function ResumePDF() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-serif print:p-0 print:shadow-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider mb-2">SRAJAL TIWARI</h1>
        <p className="text-sm">srajaltiwari902@gmail.com | +91 9919084211 | Lucknow, India</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-8 mb-6 text-sm">
        <span>LinkedIn</span>
        <span>Github</span>
        <span>CodingNinjas</span>
        <span>Leetcode</span>
      </div>

      <hr className="border-black mb-6" />

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">SKILLS</h2>
        <div className="text-sm space-y-1">
          <p>
            <strong>Programming skills:</strong> C/C++, Python, SQL
          </p>
          <p>
            <strong>Libraries:</strong> Pandas, Numpy, Matplotlib, Scikit-learn, Seaborn
          </p>
          <p>
            <strong>Core Competencies:</strong> Basics of DSA, Machine learning, Operating System, DBMS
          </p>
          <p>
            <strong>Tools & Platforms:</strong> Google Colaboratory, Kaggle, Cursor IDE, MySQL Workbench, VS Code,
            Docker
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">EDUCATION</h2>
        <div className="text-sm">
          <h3 className="font-bold">Babu Banarasi Das University, Lucknow</h3>
          <p>B.Tech in Computer Science and Engineering (Artificial Intelligence)</p>
          <p>Expected Graduation: 2027 | CGPA: 8.3/10 (First Year)</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">PROJECTS</h2>

        <div className="mb-4 text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">Spam Email Prediction Model -- GitHub</h3>
            <span>April 2025</span>
          </div>
          <p className="text-xs mb-1">
            Developed a logistic regression model to classify emails as spam or ham, achieving 96.77% training accuracy
            and 96.68% test accuracy using Python and scikit-learn.
          </p>
          <p className="text-xs mb-1">
            Applied TF-IDF vectorization to transform email text into numerical features, optimizing for accurate spam
            detection.
          </p>
          <p className="text-xs">
            Enhanced model performance through hyperparameter tuning and robust text preprocessing.
          </p>
        </div>

        <div className="mb-4 text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">Rock vs. Mine Prediction Model -- GitHub</h3>
            <span>May 2025</span>
          </div>
          <p className="text-xs mb-1">
            Developed a logistic regression model to classify sonar signals as rock or mine, achieving 83.42% training
            accuracy and 76.19% test accuracy using Python and scikit-learn.
          </p>
          <p className="text-xs mb-1">
            Processed 208 sonar data samples with 60 features, splitting into 90-10 train-test sets using stratified
            sampling for balanced evaluation.
          </p>
          <p className="text-xs">
            Demonstrated effective feature understanding and binary classification techniques on real-world sonar data.
          </p>
        </div>

        <div className="text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">Diabetes Prediction Model -- GitHub</h3>
            <span>May 2025</span>
          </div>
          <p className="text-xs mb-1">
            Built a logistic regression model on the PIMA Indian Diabetes dataset using Python and Scikit-learn,
            achieving 77% test accuracy through EDA, feature selection, and model tuning.
          </p>
          <p className="text-xs mb-1">
            Compared models (Logistic Regression) and evaluated performance using confusion matrix and classification
            report.
          </p>
          <p className="text-xs">
            Integrated data visualization and EDA to uncover key trends influencing diabetes prediction.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">EXPERIENCE</h2>
        <div className="text-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold">Artificial Intelligence Intern — Codec Technologies (Remote)</h3>
          </div>
          <div className="mb-2">
            <span>March 2025 – May 2025 – Certificate</span>
          </div>
          <p className="text-xs mb-1">
            Applied AI concepts including supervised/unsupervised learning and reinforcement learning.
          </p>
          <p className="text-xs mb-1">
            Built and evaluated machine learning models using Python and key ML frameworks.
          </p>
          <p className="text-xs">
            Participated in real-world AI projects involving data cleaning, preprocessing, and model optimization.
          </p>
        </div>
      </section>

      {/* Certification */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">CERTIFICATION</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              <strong>AI Engineer Certification, One Roadmap (View)</strong>
            </span>
            <span>May 29, 2025</span>
          </div>
          <p className="text-xs ml-4">Completed projects on supervised and unsupervised learning algorithms.</p>

          <div className="flex justify-between">
            <span>
              <strong>Python Certification, One Roadmap (View)</strong>
            </span>
            <span>May 21, 2025</span>
          </div>
          <p className="text-xs ml-4">Practiced Python programming, data structures, and functional logic.</p>

          <div className="flex justify-between">
            <span>
              <strong>SQL Certification, One Roadmap (View)</strong>
            </span>
            <span>May 21, 2025</span>
          </div>
          <p className="text-xs ml-4">Worked on SQL queries, joins, and real-time database management.</p>

          <div className="flex justify-between">
            <span>
              <strong>Cyber Security Virtual Experience, Deloitte (Forage) (View)</strong>
            </span>
            <span>July 7, 2025</span>
          </div>
          <p className="text-xs ml-4">Simulated threat analysis and cybersecurity risk mitigation tasks.</p>

          <div className="flex justify-between">
            <span>
              <strong>Data Analytics Virtual Experience, Deloitte (Forage) (View)</strong>
            </span>
            <span>July 7, 2025</span>
          </div>
          <p className="text-xs ml-4">Performed data analysis and forensic technology simulations.</p>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-xl font-bold mb-3">ACHIEVEMENTS</h2>
        <div className="space-y-1 text-sm">
          <p>Participated in Ninja Slayground 2.0, a competitive coding event by Coding Ninjas.</p>
          <p>Attended the Google GDG Program in Lucknow and earned verified participation badges.</p>
        </div>
      </section>
    </div>
  )
}
