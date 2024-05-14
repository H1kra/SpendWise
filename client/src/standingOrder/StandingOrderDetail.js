function StandingOrderDetail({ standingOrder }) {
    return (
        <div>
            <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
                <div style={RecordStyle()}>{standingOrder.label}</div>
                <div style={RecordStyle()}>{standingOrder.amount}</div>
                <div style={RecordStyle()}>{standingOrder.type}</div>
            </div>
            <div style={{ rowGap: "4px", height: "40px", textAlign: "center", alignContent: "center"}}>
                <div style={{position: "relative", height: "30px"}}>{standingOrder.note}</div>
            </div>
        </div>
)
    ;

    function RecordStyle() {
        return {
            overflow: "hidden",
            position: "relative",
            fontSize: "22px",
            display: "flex",
            width: "33%",
            height: "30px",
            textAlign: "center",
            justifyContent: "center",
        }
    }
}

export default StandingOrderDetail;