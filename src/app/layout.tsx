import {Roboto} from 'next/font/google';

import type {Metadata} from 'next';
import ReduxProvider from './redux/redux-provider';
import Theme from './Theme';

const roboto = Roboto({
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '500', '700', '900'],
    variable: '--roboto',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'UseeSvit',
    description: 'UseeSvit',
};

type Props = {
    children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({children}) => {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <ReduxProvider>
                    <Theme>{children}</Theme>
                </ReduxProvider>
            </body>
        </html>
    );
};

export default RootLayout;
