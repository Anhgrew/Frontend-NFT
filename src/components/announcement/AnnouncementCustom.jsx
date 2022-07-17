import React from 'react'
import Logo from './logo.svg'
import Announcement from 'react-announcement'

export default function AnnouncementCustom() {
    return (
        <div>
            <Announcement
                title="Here is your results"
                subtitle="NFT stands for non-fungible token. It's generally built using the same kind of programming as cryptocurrency, like Bitcoin or Ethereum, but that's where the similarity ends."
                link="https://github.com/kristofferandreasen/react-announcement"
                imageSource={Logo}
            />
        </div>
    )
}
