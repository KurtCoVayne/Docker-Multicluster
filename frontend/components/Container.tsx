import Head from 'next/head';

import './../public/Normalize.css';

function Container(props:any){
    return(
        <div>
            <Head>
                <title>{props.title}</title>

                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                ></link>

                <script
                    src="https://unpkg.com/react/umd/react.production.min.js"
                    crossOrigin="anonymous"
                ></script>

                <script
                    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                    crossOrigin="anonymous"
                ></script>

                <script
                    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                    crossOrigin="anonymous"
                ></script>

            </Head>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Container;