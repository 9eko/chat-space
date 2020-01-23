# DB設計

## users table

|Column|Type|Option|
|------|----|------|
name|string|index: true, null: false|
email|string|null: false, unique: true|
password|string|null: false|

### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## group_users table

|Column|Type|Option|
|------|----|------|
user_id|references|null: false, foreign_key: true|
group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups table

|Column|Type|Option|
|------|----|------|
name|stirng|index: true, null: false|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

## messages table

|Column|Type|Option|
|------|----|------|
body|text|index: true|
image|text||
group_id|references|null: false, foreign_key: true|
user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :gorup