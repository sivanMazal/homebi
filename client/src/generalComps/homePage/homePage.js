import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Card from './card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./HomePage.css";
import NavBar from '../navBar/navBar';
import { useEffect } from 'react';

const arr = [
    { label: "מבנה גבוה", imgPath: "/images/homePage1.jpg" },
    { label: "מבנה גבוה", imgPath: "/images/homePage2.jpg" },
    { label: "מבנה גבוה", imgPath: "/images/homePage3.jpg" },
    { label: "מבנה גבוה", imgPath: "/images/homePage4.jpg" },
];

const arr_cards = [
    { icon: <FavoriteBorderIcon />, title: "תשומת לב ללקוח", desc: "שירות ברמה הגבוהה ביותר על מנת לוודא את שביעות רצון הלקוחות." },
    { icon: <LocalAtmIcon />, title: "ניהול פיננסי", desc: "עקבו אחר הוצאות והכנסות הבניין בצורה ממוקדת ומדויקת דרך ממשק הניהול." },
    { icon: <WorkspacePremiumIcon />, title: "מקצועיות", desc: "שמירה על מקצועיות רבה ושימת לב לפרטים הקטנים ביותר!" },
    { icon: <AssessmentIcon />, title: "דוחות וניתוחים", desc: "קבלו דוחות מפורטים וניתוחים סטטיסטיים שיעזרו לכם בניהול הכספים בבניין." },
]
export default function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animation duration in milliseconds
            once: true,      // Whether to only animate elements once
            easing: 'ease',  // Easing function for the animation
            // More options...
        });
        AOS.refresh();
    }, []);
    return (
        <div>
            <NavBar />
            <div className='cover top-banner d-flex align-items-center center p-0'>
                <div class="sm-txt mt-4 pe-5">
                    <h1 style={{ fontWeight: "100px", fontSize: "60px" }}><strong>HOUSEMENT</strong></h1>
                    <h2 style={{ fontWeight: "50px" }}><strong> החיבור שלכם לאיכות חיים </strong></h2>
                </div>
                <img src="https://tidhar.co.il/wp-content/uploads/2020/10/תדהר-שרת-תל-אביב-חוץ-2-e1668588621433.jpg" className='cover-image' />
            </div>

            <div className='text-center my-5 pb-3 head'>
                <h2>HouseMent – מתייעלים, חוסכים, משתדרגים!</h2>
                <h4>
                    מערכת חכמה לניהול בניינים
                </h4>
                <div className='mb-2 text-center mx-auto d-block text-center'>
                    <hr className='staticts' style={{width:"10%"}}/>
                </div>
            </div>

            <section className='my-5 pb-3'>
                <div className='container'>
                    <div className='row gx-0 justify-content-around'>
                        {arr_cards.map(item => <div className='cardInfo center shadow-lg' data-aos="fade-up" data-aos-duration="1000" key={item.icon}>
                            <Card item={item} />
                        </div>)}
                    </div>
                </div>
            </section>

            <section class="container-fluid p-0 py-5 bg-white" >
                <div class="container py-4 px-0">
                    <div class="row gx-0 justify-content-between align-items-center">
                        <div class="col-lg-5 col-sm-8">
                            <img src="/images/building.jpg" class="img-add" />
                        </div>
                        <div class="col-lg-6 col-sm-8">
                            <h2 className="mb-4"><strong> מה זה HouseMent? </strong></h2>
                            <p style={{ fontSize: "18px" }}>HouseMent זה אתר שמכיל מחשבה עמוקה והמון רצון כדי שיהיה כמה שיותר טוב וקל לוועד הבית. וכן האתר שלנו מכיל בתוכו שקיפות ארגונית - כל ההוצאות וההכנסות ניתנים לצפייה לכל דייר וכך הדיירים יכולים להבטיח את תשלומיהם. התכנית נבחרה בקפידה ולאחר המון מחשבה על מנת שיהיה את כל מה שנדרש וכמה שיותר נגיש ונח. אנו ממליצים לכם לנסות ובטוחים שתמליצו לחברכם בבנינים הסמוכים.</p>
                        </div>
                        <div class="col-lg-6 col-sm-8 pt-5">
                            <h2 className="mb-3"><strong>HouseMent לדיירים ומנהלי וועד</strong> </h2>
                            <p style={{ fontSize: "18px" }}>איך פתרנו מפגעים ותקלות בבניין עד היום? טלפונים? מיילים?! מארבים ל-ועד הבית?!?
                                מהיום, עם HouseMent, הדיירים עושים הכל בטאץ'! נתקלתם במפגע או תקלה? נכנסים לאתר HouseMent מדווחים בקלות בטקסט ו/או בתמונה הדיווח עובר לגורם המטפל, ואפילו תקבלו עדכונים על המהירות בה תטופל הבעיה!
                                אנו ב-HouseMent פיתחנו מערכת ייעודית המאפשרת דיווח באמצעות אפליקציה קלה ופשוטה לתפעול. מערכת HouseMent מנתחת את המידע ושולחת אותו לגורם האחראי, לטובת פתרון מהיר ומקצועי.</p>
                        </div>

                        <div class="col-lg-5 col-sm-8  mt-5">
                            <img src="/images/homePage1.jpg" class="img-add" />

                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center my-5'>
                <h2 className='mb-5'><strong> המערכת שלנו </strong></h2>
                <div className='row gx-0 services'>
                    <div className='col-md-4 p-2'>
                        <img src="https://orkol-systems.com/lp/serve-more-clients.png" alt="" className='pb-3' />
                        <h3>תשפר</h3>
                        <p>את יעילות ניהול הועד</p>
                    </div>
                    <div className='col-md-4 p-2'>
                        <img src="https://orkol-systems.com/lp/work_efficiency.png" alt="" className='pb-3' />

                        <h3>תשרת</h3>
                        <p>יותר טוב את הדיירים</p>
                    </div>
                    <div className='col-md-4 p-2'>
                        <img src="https://orkol-systems.com/lp/time-saving.png" alt="" className='pb-3' />
                        <h3>תחסוך</h3>
                        <p>הרבה זמן וכאבי ראש</p>
                    </div>
                </div>
            </div>

            <footer className="footer bg-white">
                <p>&copy; 2023 כל הזכויות שמורות למערכת ניהול הוצאות והכנסות בניין</p>
            </footer>
        </div >
    )
}

