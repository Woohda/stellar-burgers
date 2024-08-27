import { FC } from "react";
import styles from './page-component.module.css';

type TPageComponentProps = {
    children: React.ReactNode;
    title: string;
}

export const PageComponent: FC<TPageComponentProps> = ({ children, title }) => {
    return (
        <main className={styles.container}>
            <div className={styles.content}>
            <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
            {children}
            </div>
        </main>
    );
}