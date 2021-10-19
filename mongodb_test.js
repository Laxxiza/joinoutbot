const { botId } = require("./data")

admins - {ch_ids:[1,2,3], tg_id:123, tg_username:"lunachrysy", tg_name:"Chrysy"}
channels - {ch_id:123, admins_ids: [1,2,3], isWork:true, ch_name:"Name chanl"}
users - {tg_id:231, tg_username:"username", tg_name:"Name", ch_ids:[1,2,3]}
userStatistics - {}
currentOnline - {ch_id:123, user_id:123, tg_username:"username", tg_name:"Name", status:"Join|Out|Timeout|Dinner"}

admins
    -tg_id
    -tg_username
    -tg_name
    -ch_ids

channels
    -ch_id
    -ch_type
    -ch_name
    -admins_ids
    -users_ids
    -isWork
    -Date

users
    -tg_id
    -tg_username
    -tg_name
    -ch_ids
    -status //new

currentOnline
    -channels[
        -user_id
        -Date
    ]

userStatistics
    -channels[
        -Date
            -channel[
                -user_id
                -status
                -Date
            ]
    ]

Buttons - ["#налинии", "#перерыв", "#обед", "#завершил"]
    - бот должен проверять отработку
Admin -
    - AdminsButton - ["#статистика 2021-08-25"]
    - SetAnotherAdmin - []
    - Различный уровень доступа к каналам для руководителей
    - АДмин должен иметь возможность добавить пользователя для отработки
    - Выгрузка в формте exel
    - Обед 1 час
    - Перерыв более 15 минут - БАН

bot
    -telegram quit on chat