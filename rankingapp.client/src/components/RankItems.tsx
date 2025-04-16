import React, { useState, useEffect } from "react";
import MovieImageArray from "./MovieImages";
import RankingGrid from "./RankingGrid";

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

    // Handle drag and drop functionality
    function drag(ev: React.DragEvent<HTMLDivElement>): void {
        ev.dataTransfer.setData("text", (ev.target as HTMLImageElement).id);
    }

    function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
    }

    function drop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        const targetElement = (ev.target as HTMLImageElement);
        if (targetElement.nodeName === "IMG") {
            return false;
        }
        if (targetElement.childNodes.length === 0) {
            const data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map(
                (item) => (item.id === data ?
                    { ...item, ranking: parseInt(targetElement.id.substring(5)) }
                    : { ...item, ranking: item.ranking })
            );
            setItems(transformedCollection);
        }

    }

    function logThis(ev: React.MouseEvent<HTMLImageElement>) {
        console.log(ev.dataTransfer.getData("text"));
        console.log((ev.target as HTMLImageElement).id);
    }

    // Show a loading message while waiting for the items
    const contents = <div className="items-not-ranked">
        {
            (items.length > 0) ?
                items.map((item) =>
                <div className="unranked-cell" key={`item-${item.id}`}>
                    <img
                            id={`item-${item.id}`}
                            src={MovieImageArray.find(x => x.id === item.imageId)?.image}
                            style={{ cursor: "pointer" }}
                            draggable={true}
                            onDragStart={drag}
                            alt={item.title}
                            onClick={logThis}
                    />
                </div>
                )
                : <div>Loading...</div>
        }
    </div>

    return (
        <div>
            <main>
                <RankingGrid items={items} imgArray={MovieImageArray} drag={drag} allowDrop={allowDrop} drop={drop} />
                {contents}
            </main>
        </div>
    );

    async function getItems() {
        const response = await fetch(`item/${dataType}`);
        if (response.ok) {
            //console.log("Fetching Items");
            const data = await response.json();
            setItems(data);
        }
    }

}
export default RankItems;