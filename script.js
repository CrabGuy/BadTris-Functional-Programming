
const Cells = Object.freeze([...document.getElementsByClassName("cell")])

const GetCurrentPlayer = (State) => (State.filter((Value) => Value.getAttribute("data-value") != "empty")).length % 2 == 0 ? "X" : "O"

const CheckValues = (Arr) => {
    const WantedLength = Arr.length
    const ActualValue = GetValue(Arr[0])
    const Value = ActualValue == "empty" ? "Invalid" : ActualValue
    return Arr.filter((Div) => GetValue(Div) == Value).length == WantedLength
}

const TrimArr = (Arr, Indexes) => Arr.filter((_, Index) => Indexes.indexOf(Index) != -1)

const Indexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const EvaluateState = (State) => {
    const CheckIndexes = (Indexes) => CheckValues(TrimArr(State, Indexes))

    return Indexes.reduce((Accumulator, Value) => Accumulator || CheckIndexes(Value), false)
}


const ChangeValue = (Value, Div) => {
    Div.setAttribute("data-value", Value)
    Value == "X" || Value == "O" ? Div.textContent = Value : null
}

const GetValue = (Div) => Div.getAttribute("data-value")

const GetState = () => Object.freeze([...document.getElementsByClassName("cell")])

const EndGame = () => GetState().forEach((Div) => {ChangeValue("Ended", Div); Div.style["background-color"] = "green"})

Cells.forEach((Div) => {
    Div.addEventListener("click", () => {
        const CurrentPlayer = GetCurrentPlayer(GetState())
        GetValue(Div) == "empty" ? ChangeValue(CurrentPlayer, Div) : null
        EvaluateState(GetState()) ? EndGame() : null
    })
})