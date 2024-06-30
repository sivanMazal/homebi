import React from 'react';
import './HomePage.css';

const HomePage2 = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>ברוכים הבאים למערכת וועד בית</h1>
        <p>ניהול יעיל ומדויק של הוצאות והכנסות בבניין על ידי הועד המקומי.</p>
        <a href="/login" className="cta-button">כניסה למערכת</a>
      </header>

      <section className="features">
        <div className="feature">
          <h2>
            ניהול פיננסי ממוקד
            </h2>
          <p>
            עקבו אחר הוצאות והכנסות הבניין בצורה ממוקדת ומדויקת דרך ממשק הניהול.
            </p>
        </div>
        <div className="feature">
          <h2>
            דוחות וניתוחים
            </h2>
          <p>
            קבלו דוחות מפורטים וניתוחים סטטיסטיים שיעזרו לכם בניהול הכספים בבניין.
            </p>
        </div>
        <div className="feature">
          <h2>תזכורות ודיווחים</h2>
          <p>השתמשו במערכת תזכורות ודיווחים כדי לנהל את הוצאות והכנסות הבניין בצורה מסודרת ובמועד.</p>
        </div>
      </section>

      <section className="dashboard">
        <h2>לוח בקרה ותצוגה כללית</h2>
        <p>עיינו בלוח הבקרה והתצוגה הכללית לצפייה מהירה וממוקדת בסטטוס הכללי של הוצאות והכנסות הבניין.</p>
        <a href="/dashboard" className="btn">צפייה בלוח הבקרה</a>
      </section>

      <section className="testimonial">
        <h2>מה אומרים עלינו</h2>
        <div className="testimonial-text">
          <p>"המערכת יציבה ומאוד ידידותית לשימוש. הצוות מאוד עוזר וזמין לכל שאלה."</p>
          <span>- יעל כהן</span>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2023 כל הזכויות שמורות למערכת ניהול הוצאות והכנסות בניין</p>
      </footer>
    </div>
  );
}

export default HomePage2;
