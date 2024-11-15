import PropTypes from "prop-types"

const EnterAmount = ({ amount, onAmount }) => {
    return (
        <div className="flex flex-col my-2 ">
            <label htmlFor="enterAmount" className="text-sm mb-1 font-semibold">Enter Amount</label>
            <input 
                type="number" 
                name="enterAmount" 
                id="enterAmount" 
                className="w-full md:w-80 lg:w-52 xl:w-72 border-solid border-2 rounded-lg p-3" 
                min={0}
                step={0.0}
                value={amount}
                onChange={(e) => onAmount(e.target.value)}
            />
        </div>
    )
}

EnterAmount.propTypes = {
    amount: PropTypes.string,
    onAmount: PropTypes.func
}

export default EnterAmount