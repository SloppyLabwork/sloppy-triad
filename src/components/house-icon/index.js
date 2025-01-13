import brobnarLogo from '../../images/houses-flat/brobnar.png'
import disLogo from '../../images/houses-flat/dis.png'
import ewkidonLogo from '../../images/houses-flat/ekwidon.png'
import logosLogo from '../../images/houses-flat/logos.png'
import marsLogo from '../../images/houses-flat/mars.png'
import sanctumLogo from '../../images/houses-flat/sanctum.png'
import saurianLogo from '../../images/houses-flat/saurian.png'
import shadowsLogo from '../../images/houses-flat/shadows.png'
import starallianceLogo from '../../images/houses-flat/staralliance.png'
import unfathomableLogo from '../../images/houses-flat/unfathomable.png'
import untamedLogo from '../../images/houses-flat/untamed.png'
import geistoidLogo from '../../images/houses-flat/geistoid.png'
import skybornLogo from '../../images/houses-flat/skyborn.png'
import redemptionLogo from '../../images/houses-flat/redemption.png'

const houesIdToImage = (houseId) =>
  ({
    brobnar: brobnarLogo,
    dis: disLogo,
    ekwidon: ewkidonLogo,
    logos: logosLogo,
    mars: marsLogo,
    sanctum: sanctumLogo,
    saurian: saurianLogo,
    shadows: shadowsLogo,
    staralliance: starallianceLogo,
    unfathomable: unfathomableLogo,
    untamed: untamedLogo,
    geistoid: geistoidLogo,
    skyborn: skybornLogo,
    redemption: redemptionLogo,
  }[houseId])

function HouesIcon(props) {
  const { houseId } = props
  return (
    <img className="house-icon" alt={houseId} src={houesIdToImage(houseId)} />
  )
}

export default HouesIcon
