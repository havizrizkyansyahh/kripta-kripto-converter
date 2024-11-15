import PropTypes from "prop-types"

const Output = ({ amount, selectedCoin, selectedFiat, updatedTime, isSwitched }) => {
    const getCalculatedOutput = () => {
        const exchangeRate = selectedCoin.price_usd * selectedFiat.perUsd;

        const calculatedOutput = !isSwitched 
            ? amount * exchangeRate
            : amount / exchangeRate;

        const formattedCryptoToFiat = calculatedOutput.toLocaleString(selectedFiat.code, { 
            style: 'currency', 
            currency: selectedFiat.ticker
        });

        return !isSwitched ? formattedCryptoToFiat : calculatedOutput.toFixed(8);
    }

    const getUpdatedTime = () => {
        const timestamp = updatedTime;
        const date = new Date(timestamp * 1000);

        const formattedTime = date.toLocaleString('id-ID', { 
            timeZone: 'Asia/Jakarta', 
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        }).replace(".", ":");
        
        return formattedTime;
    }

    const getFormattedAmount = () => {
        if(amount === "") return 0;
        const formattedAmount = 
            !isSwitched 
            ?   
                parseFloat(amount).toLocaleString(selectedFiat.code)
            :
                parseFloat(amount).toLocaleString(selectedFiat.code, { 
                    style: 'currency', 
                    currency: selectedFiat.ticker
                });
    
        return formattedAmount;
    };

    const isLoading = !selectedCoin || !selectedFiat || !updatedTime;

    return(
        <div className="flex justify-center text-center mt-3 md:mt-6">
            { isLoading 
                ?
                    <p>Loading...</p>
                :
                    <p>
                        <span className="text-lg font-bold block lg:inline">
                            { !isSwitched 
                                ? `${getFormattedAmount()} ${selectedCoin.symbol} = ${getCalculatedOutput()} `
                                : `${getFormattedAmount()} = ${getCalculatedOutput()} ${selectedCoin.symbol} `
                            }
                        </span>
                        <span className="text-sm text-gray-500">Last updated at {getUpdatedTime()} WIB</span>
                    </p>
            }
        </div>
    )
}

Output.propTypes = {
    amount: PropTypes.string,
    selectedFiat: PropTypes.object,
    selectedCoin: PropTypes.object,
    updatedTime: PropTypes.number,
    isSwitched: PropTypes.bool
}

export default Output