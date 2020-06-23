import Head from 'next/head';

function Container(props:any){
    return(
        <div>
            <Head>
                <title>{props.title}</title>
            </Head>
            <div className='modo'>
                {props.children}
            </div>
        </div>
    );
}

export default Container;