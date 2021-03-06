class List < ActiveRecord::Base
  validates :name, :user_id, presence: true
  validates :name, uniqueness: true

  belongs_to :user
  has_many :tasks
end
