function TransactionDetail({ transaction }) {
    return (
        <div>
            <div style={{display: "flex", rowGap: "4px", height: "30px"}}>
                <div style={RecordStyle()}>{transaction.label}</div>
                <div style={RecordStyle()}>{transaction.amount}</div>
                <div style={RecordStyle()}>{transaction.type}</div>
            </div>
            <div style={{ rowGap: "4px", height: "40px", textAlign: "center", alignContent: "center"}}>
                <div style={{position: "relative", height: "30px"}}>{transaction.note}</div>
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

export default TransactionDetail;