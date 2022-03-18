
package console

import (
	"encoding/json"
	"fmt"
)

func Petty(data interface{})  {
	str, err := json.MarshalIndent(data, " ", "  ")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(str))
}



