const
  {Asset} = require('../db/models'),
  { sendExpectedError, sendUnexpectedError } = require('../services/responses'),
  middleware ={};

// Check if a portfolio by id (req.params.portfolioID)
//owns an asset with id (req.params.assetId)

middleware.portfolioMatchesAsset = async(req, res, next)=> {
  try {
    const
      {portfolioId, assetId} = req.params,
      assetFound = await Asset.findOne({where : {id : assetId, portfolioId }});

      if (assetFound){
        res.locals.asset = assetFound;
        return next();
      }
      else { sendExpectedError(`User with id ${userId} does not own a portfolio with id ${portfolioId}`, res, 400); }
  }
  catch(err){ sendUnexpectedError(err, res); }
}

module.exports = middleware;