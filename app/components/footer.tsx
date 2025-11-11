import classes from './footer.module.css'

export default function Footer(){
    return <footer className={classes.mainFooter}>
        <div className={classes.footerMain}>
            <p className={classes.footerLogo}>SOIL-MOISTURE</p>
            <p className={classes.p}>Контент заборонено розповсюджувати без вказання на джерела даного ресурсу. <br/> &copy; <span>{new Date().getFullYear()}</span>. Всі права захищені. </p>
        </div>
    </footer>
}