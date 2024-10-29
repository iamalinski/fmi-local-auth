import React, { useEffect, useState } from "react"
import { Button, Text, View } from "react-native"
import * as LocalAuthentication from "expo-local-authentication"

const BiometricLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    handleBiometricAuth()
  }, [])

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync()
    const isEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (hasHardware && isEnrolled) {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: "Удостоврете Вашата самоличност.",
      })

      if (authResult.success) {
        // токен, който е записан в хранилището на устройството при първия вход на потребителя (при първия вход не се изисква биометрични данни)
        const token = "123456"

        if (token) {
          const isValid = await authenticateWithBackend(token)
          if (isValid) {
            setIsAuthenticated(true)
          } else {
            alert("Невалиден токен, моля впишете се с Вашите име и парола.")
          }
        }
      } else {
        alert("Не успяхме да удостоверим Вашата самоличност.")
      }
    } else {
      alert("Устройството Ви не поддържа биометрична уторизация.")
    }
  }

  const authenticateWithBackend = async (token: string) => {
    //валидиране на токена в backend-а
    return true
    // return false
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isAuthenticated ? (
        <Text>Вие се уторизирахте успешно!</Text>
      ) : (
        <Button title="Вход с биометрия" onPress={handleBiometricAuth} />
      )}
    </View>
  )
}

export default BiometricLogin
