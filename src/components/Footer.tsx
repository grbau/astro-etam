import "../styles/footer.scss";

interface FooterProps {
    data: any;
}
export function Footer({ data }: FooterProps) {
    const {copyright, title, informtion_section } = data || {};

    return (
        <footer>
            <p>toto</p>
            {copyright &&
                <><p className="body-01">{copyright}</p><div>{JSON.stringify(data)}</div></>
            }
        </footer>
    )
}
  