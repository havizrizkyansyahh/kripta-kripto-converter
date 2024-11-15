import PropTypes from "prop-types"

const SelectCoin = ({ cryptoData, onSelectedCoin }) => {

    const handleChange = (e) => {
        const selectedId = e.target.value;
        const selectedCrypto = cryptoData.find( (cryptoCoin) => cryptoCoin.id === selectedId);

        onSelectedCoin(selectedCrypto);
    };

    return(
        <div className="flex flex-col my-2">
            <label htmlFor="selectCoin" className="text-sm mb-1 font-semibold">Select Coin</label>
            <select name="selectCoin" id="selectCoin" 
                className="w-full md:w-64 border-solid border-2 rounded-lg p-3"
                onChange={handleChange}
            >
                { cryptoData.map((cryptoCoin) => (
                    <option value={cryptoCoin.id} key={cryptoCoin.id}>
                        { `${cryptoCoin.name} (${cryptoCoin.symbol})` }
                    </option>
                ))}
            </select>
        </div>
    )
}

SelectCoin.propTypes = {
    cryptoData: PropTypes.array,
    selectedCoin: PropTypes.object,
    onSelectedCoin: PropTypes.func
}

export default SelectCoin