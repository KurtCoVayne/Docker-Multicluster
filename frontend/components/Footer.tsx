const css=require('./../public/footer.css');

function Footer(/* props:any */){
    return(
        <footer className={css.footer} >
            <div className="container">
                <p>Nixon Lizcano y John Gonzalez</p>
            </div>
        </footer>
    );
}

export default Footer;