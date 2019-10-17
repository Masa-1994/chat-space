# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
|username|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :messages
- has_many :groups_members
- has_many  :members,  through:  :groups_members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|username|text|null: false|
### Association
- has_many :groups_members
- has_many  :groups,  through:  :groups_members

## groups_membersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :member

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|username|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user