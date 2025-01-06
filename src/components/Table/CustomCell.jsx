function AmountPledged({ amount, currency }) {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
}

function PercentageFunded({ percentage, amountPledged, currency }) {
  return (
    <div>
      <div>
        {percentage}% (
        <AmountPledged
          amount={amountPledged * 0.01 * percentage}
          currency={currency}
        />{" "}
        / <AmountPledged amount={amountPledged} currency={currency} />)
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            background: "grey",
            height: ".5rem",
            zIndex: -2,
            borderRadius: ".5rem",
          }}
        />
        <div
          style={{
            position: "absolute",
            background: "green",
            height: ".5rem",
            width: `${
              parseInt(percentage) >= 100 ? 100 : parseInt(percentage)
            }%`,
            top: 0,
            zIndex: 0,
            borderRadius: ".5rem",
          }}
        />
      </div>
    </div>
  );
}

function EndTime({ timestamp }) {
  return new Date(timestamp).toLocaleString(
    {},
    { dateStyle: "medium", timeStyle: "short" }
  );
}

function NumberOfBackers({ value }) {
  return parseInt(value).toLocaleString("en-US");
}

function CustomCell({ columnName, value, item }) {
  switch (columnName) {
    case "amt.pledged":
      return <AmountPledged amount={value} currency={item?.currency} />;
    case "percentage.funded":
      return (
        <PercentageFunded
          percentage={value}
          amountPledged={item?.["amt.pledged"]}
          currency={item?.currency}
        />
      );
    case "end.time":
      return <EndTime timestamp={value} />;
    case "num.backers":
      return <NumberOfBackers value={value} />;
    default:
      return value;
  }
}

export default CustomCell;
