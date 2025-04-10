import React, { useState, useEffect } from "react";

interface item {
    id: number;
    title: string;
    imageId: number;
    ranking: number;
    itemType: number;
}

function RankItems() {

    const [items, setItems] = useState<item[]>([]);
    const dataType = 1;

    useEffect(() => {
        getItems()
    }, []);



    const contents = (items != null) ?
        <main>
            {
                items.map((item) => (item.ranking === 0)
                    ? <div key={`item-${item.id}`}> { item.title } </div>
                    : null)
            }
        </main>
        : <div>Loading...</div>

    return (
        <div>
            { contents }
        </div>
    );

    async function getItems() {
        const response = await fetch(`item/${dataType}`);
        if (response.ok) {
            console.log("Fetching Items");
            const data = await response.json();
            setItems(data);
        }
    }

}
export default RankItems;