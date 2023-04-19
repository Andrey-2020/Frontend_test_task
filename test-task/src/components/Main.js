import React from 'react';
import Card from './Card'
import Filter from './Filter'
import {Pagination} from 'fwt-internship-uikit'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <Filter authors={props.authors} locations={props.locations} setCreated={props.setCreated}/>
            <section>
                <ul className="places">
                    {props.cards.map((card) => (
                        <Card card={card} key={card.id} />
                    ))}
                </ul>
            </section>

            <Pagination />
        </main>
    );
}

export default Main;
