function StandingOrderDateTimeBadge({ standingOrder }) {
    const dateToShow = new Date(standingOrder.startDate);

    return (
        <div className={"rounded"} style={componentStyle()}>
            <div className={"rounded"} style={dateStyle()}>
                <div>{dateToShow.getDate().toString().padStart(2, "0")}</div>
                <div>{dateToShow.toLocaleString("cs-CZ", { month: "short" })}</div>
            </div>
        </div>
    );
}

function componentStyle() {
    return {
        width: "88px",
        backgroundColor: "lightgrey",
        display: "grid",
        height: "max-content",
    };
}

function dateStyle() {
    return {
        display: "flex",
        justifyContent: "center",
        gap: "4px",
        padding: "8px",
        fontSize: "22px",
        color: "black",
        lineHeight: 1,
    };
}

function timeStyle() {
    return {
        display: "flex",
        justifyContent: "center",
        fontSize: "20px",
        lineHeight: 1,
        padding: "4px 4px 8px 4px",
        background: "white",
        color: "black",
    };
}

export default StandingOrderDateTimeBadge;
