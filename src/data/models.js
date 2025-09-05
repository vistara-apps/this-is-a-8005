// Data models for the application

export class User {
  constructor(data = {}) {
    this.userId = data.userId || this.generateId()
    this.email = data.email || ''
    this.subscriptionStatus = data.subscriptionStatus || 'free'
    this.state = data.state || ''
    this.preferredLanguage = data.preferredLanguage || 'english'
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      userId: this.userId,
      email: this.email,
      subscriptionStatus: this.subscriptionStatus,
      state: this.state,
      preferredLanguage: this.preferredLanguage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

export class IncidentRecord {
  constructor(data = {}) {
    this.recordId = data.recordId || this.generateId()
    this.userId = data.userId || ''
    this.timestamp = data.timestamp || new Date().toISOString()
    this.eventType = data.eventType || 'general'
    this.mediaUrl = data.mediaUrl || null
    this.ipfsHash = data.ipfsHash || null
    this.notes = data.notes || ''
    this.location = data.location || null
    this.duration = data.duration || 0
    this.isShared = data.isShared || false
    this.sharedWith = data.sharedWith || []
    this.metadata = data.metadata || {}
  }

  generateId() {
    return 'record_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      recordId: this.recordId,
      userId: this.userId,
      timestamp: this.timestamp,
      eventType: this.eventType,
      mediaUrl: this.mediaUrl,
      ipfsHash: this.ipfsHash,
      notes: this.notes,
      location: this.location,
      duration: this.duration,
      isShared: this.isShared,
      sharedWith: this.sharedWith,
      metadata: this.metadata
    }
  }
}

export class StateRightsGuide {
  constructor(data = {}) {
    this.stateName = data.stateName || ''
    this.guideContent = data.guideContent || {}
    this.dosDonts = data.dosDonts || { dos: [], donts: [] }
    this.lastUpdated = data.lastUpdated || new Date().toISOString()
    this.version = data.version || '1.0'
  }

  toJSON() {
    return {
      stateName: this.stateName,
      guideContent: this.guideContent,
      dosDonts: this.dosDonts,
      lastUpdated: this.lastUpdated,
      version: this.version
    }
  }
}

export class Script {
  constructor(data = {}) {
    this.scriptId = data.scriptId || this.generateId()
    this.scenario = data.scenario || ''
    this.textEnglish = data.textEnglish || []
    this.textSpanish = data.textSpanish || []
    this.category = data.category || 'general'
    this.isPremium = data.isPremium || false
    this.customizable = data.customizable || false
    this.tags = data.tags || []
  }

  generateId() {
    return 'script_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      scriptId: this.scriptId,
      scenario: this.scenario,
      textEnglish: this.textEnglish,
      textSpanish: this.textSpanish,
      category: this.category,
      isPremium: this.isPremium,
      customizable: this.customizable,
      tags: this.tags
    }
  }
}

export class IncidentCard {
  constructor(data = {}) {
    this.cardId = data.cardId || this.generateId()
    this.recordId = data.recordId || ''
    this.location = data.location || null
    this.timestamp = data.timestamp || new Date().toISOString()
    this.rightsInfo = data.rightsInfo || {}
    this.emergencyContacts = data.emergencyContacts || []
    this.shareableUrl = data.shareableUrl || null
  }

  generateId() {
    return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  toJSON() {
    return {
      cardId: this.cardId,
      recordId: this.recordId,
      location: this.location,
      timestamp: this.timestamp,
      rightsInfo: this.rightsInfo,
      emergencyContacts: this.emergencyContacts,
      shareableUrl: this.shareableUrl
    }
  }
}
