# frozen_string_literal: true
# == Schema Information
#
# Table name: account_warnings
#
#  id                :bigint(8)        not null, primary key
#  account_id        :bigint(8)
#  target_account_id :bigint(8)
#  action            :integer          default("none"), not null
#  text              :text             default(""), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class AccountWarning < ApplicationRecord
  enum action: %i(none disable silence suspend), _suffix: :action

  belongs_to :account
  belongs_to :target_account
end
