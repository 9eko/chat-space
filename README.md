# DB設計

## users table

|Column|Type|Option|
|------|----|------|
username|string|index: true, null: false|
email|string|null: false, unique: true|
password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groups_users table

|Column|Type|Option|
|------|----|------|
user_id|integer|null: false, foreign_key: true|
group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups table

|Column|Type|Option|
|------|----|------|
groupname|stirng|index: true, null: false|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

## messages table

|Column|Type|Option|
|------|----|------|
body|text|index: true|
image|text||
group_id|integer|null: false, foreign_key: true|
user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :gorup