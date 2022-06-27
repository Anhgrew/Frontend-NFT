import React from 'react'



export const Download = props => {
    return (

        <div class="qrcode qrcode-pc">
            <div class="main-qrcode d-flex">
                <ul class="link-code">
                    <li class ="link-li">
                        <a href="https://play.google.com/store/apps/details?id=com.hitechhorizon.defiwarrior" class="img-code">
                            <img src="https://defiwarrior.io/wp-content/uploads/2022/06/gg-play-2.png" alt="images_gg" />
                        </a>
                    </li>
                    <li  class ="link-li">
                        <a href="https://apps.apple.com/us/app/defi-warrior/id1600820852" class="img-code">
                            <img src="https://defiwarrior.io/wp-content/uploads/2022/06/app-store.png" alt="images_app" />
                        </a>
                    </li>
                </ul>
                <div class="qr-code">
                    <img src="https://defiwarrior.io/wp-content/uploads/2022/06/DW-QR-2.png" alt="images_qrcode" />
                </div>
            </div>
        </div>
    )
}

