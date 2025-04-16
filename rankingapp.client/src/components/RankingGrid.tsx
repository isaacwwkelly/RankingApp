

interface item {
    id: number;
    title: string;
    imageId: number;
    ranking: number;
    itemType: number;
};

interface img {
    id: number;
    image: string;
};

interface RankingGridProps {
    items: item[]; // or whatever type items should be
    imgArray: img[]; // or whatever type imgArray should be
    drag: (ev: React.DragEvent<HTMLDivElement>) => void;
    allowDrop: (ev: React.DragEvent<HTMLDivElement>) => void;
    drop: (ev: React.DragEvent<HTMLDivElement>) => void;
}


const RankingGrid: React.FC<RankingGridProps> = ({ items, imgArray, drag, allowDrop, drop }) => {

    const rankingGrid: Array<React.ReactNode> = [];
    const cellCollectionTop: Array<React.ReactNode> = [];
    const cellCollectionMiddle: Array<React.ReactNode> = [];
    const cellCollectionBottom: Array<React.ReactNode> = [];
    const cellCollectionWorst: Array<React.ReactNode> = [];

    function pushCellMarkupToArray(cellCollection: Array<React.ReactNode>, rankNum: number, rowLabel: string) {
        if (rankNum > 0) {
            const item = items.find(x => x.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} key={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item != null) ?
                    <img id={`rank-${rankNum}`} key={`rank-${rankNum}`} src={imgArray.find(x => x.id === item.imageId)!.image} alt={item.title} draggable={true} onDragStart={drag} />
                    : null }
            </div>);
        }
        else {
            cellCollection.push(<div id={`rank-${rankNum}`} key={`rank-${rankNum}`} className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    function createCellsForRow(rowNum: number) {
        let rankNum = 0;
        let currCollection: Array<React.ReactNode> = [];
        let label = "";
        const numCells = 5;

        for (let a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)) + a - rowNum;

            if (rowNum === 1) {
                currCollection = cellCollectionTop;
                label = "Top Tier";
            }
            else if (rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = "Middle Tier";
            }
            else if (rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = "Bottom Tier";
            }
            else if (rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = "Worst Tier";
            }

            pushCellMarkupToArray(currCollection, rankNum, label);
        }
    }

    function createCellsForRows() {

        const maxRows = 4;
        for (let row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {
        rankingGrid.push(<div key="top-tier" className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div key="middle-tier" className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div key="bottom-tier" className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div key="worst-tier" className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRows();
        return createRowsForGrid();
    }

    return (
        <div className="rankings">
            { createRankingGrid() }
        </div>
    );
}

export default RankingGrid;